import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Ambil prompt dan clerk_id dari request body
    const { prompt, clerk_id } = await req.json();

    // Validasi input
    if (!prompt || !clerk_id) {
      return new Response(
        JSON.stringify({
          error: "prompt dan clerk_id harus disediakan",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 2. Inisialisasi Supabase Client (Service Role untuk bypass RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // 3. Query ke tabel 'profiles' menggunakan 'clerk_id'
    const { data: profile, error: dbError } = await supabaseAdmin
      .from("profiles")
      .select("full_name, role, email, total_topup")
      .eq("clerk_id", clerk_id)
      .single();

    if (dbError) {
      console.error("User tidak ditemukan di DB:", dbError);
    }

    // 4. Tentukan nama user untuk sapaan AI
    const userDisplayName =
      profile?.full_name && profile.full_name.trim() !== ""
        ? profile.full_name
        : "Pelanggan";

    // 5. Update timestamp aktivitas terakhir user
    await supabaseAdmin
      .from("profiles")
      .update({ last_active_timestamp: new Date().toISOString() })
      .eq("clerk_id", clerk_id)
      .catch((err) => console.error("Gagal update last_active:", err));

    // 6. Susun System Prompt untuk AI dengan informasi user
    const systemPrompt = `Anda adalah Opion AI, asisten virtual untuk platform top-up game. Anda siap membantu pengguna bernama ${userDisplayName} (Role: ${profile?.role || "free_user"}).

Informasi tambahan:
- Total top-up pengguna: Rp${(profile?.total_topup || 0).toLocaleString("id-ID")}
- Email: ${profile?.email || "tidak tersedia"}

Tugas Anda:
1. Memberikan informasi tentang layanan top-up game yang tersedia
2. Membantu pengguna dengan pertanyaan seputar transaksi dan pembayaran
3. Memberikan rekomendasi game berdasarkan preferensi pengguna
4. Menjawab pertanyaan umum tentang platform

Selalu bersikap ramah, profesional, dan membantu. Jika ada pertanyaan yang tidak berhubungan dengan platform, sambil tetap membantu, alihkan kembali ke topik platform.`;

    // 7. Panggil API Gemini
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY tidak ditemukan di environment variables");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nPertanyaan dari user: ${prompt}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const result = await response.json();

    // Validasi response dari Gemini
    if (!response.ok) {
      console.error("Gemini API Error:", result);
      throw new Error(
        result.error?.message ||
          "Gagal mendapatkan respon dari AI (Gemini API)",
      );
    }

    if (!result.candidates || !result.candidates[0]?.content?.parts?.[0]) {
      throw new Error("Format respons Gemini tidak valid");
    }

    const aiText = result.candidates[0].content.parts[0].text;

    // 8. Kirim respon balik ke Frontend
    return new Response(JSON.stringify({ answer: aiText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(
      JSON.stringify({
        error: error.message || "Terjadi kesalahan pada server",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
