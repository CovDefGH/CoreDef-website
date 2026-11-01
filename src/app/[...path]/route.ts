import { handleRequest } from "../../lib/fuzz-response/service.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

async function respond(request: Request) {
  const response = await handleRequest(request);
  if (!response) {
    const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Core Defenses</title><style>body{margin:0;background:#f7f9fc;color:#101827;font:16px system-ui,sans-serif}header{height:72px;background:#fff;border-bottom:1px solid #e0e5ec}nav{box-sizing:border-box;max-width:1100px;height:100%;margin:auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}a{color:inherit;text-decoration:none}nav strong{font-size:16px}nav span{display:flex;gap:32px;font-size:14px;color:#41516b}main{min-height:calc(100vh - 145px);display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;box-sizing:border-box}.code{font-size:clamp(120px,22vw,200px);font-weight:800;color:#e9edf2;line-height:1}.title{font-size:30px;font-weight:700;margin:-90px 0 100px;position:relative}p{max-width:480px;margin:0 auto 40px;color:#526079;line-height:1.6}.button{display:inline-block;background:#0758f9;color:#fff;padding:16px 26px}footer{border-top:1px solid #e0e5ec;padding:24px;text-align:center;color:#526079;font-size:13px}</style></head><body><header><nav><a href="/"><strong>CORE DEFENSES</strong></a><span><a href="/">Mission</a><a href="/solutions">Solutions</a><a href="/careers">Careers</a><a href="/contact">Contact Us</a></span></nav></header><main><div><div class="code">404</div><div class="title">Page not found</div><p>The page you are looking for does not exist or has been moved.</p><a class="button" href="/">Go to Homepage</a></div></main><footer>CORE DEFENSES</footer></body></html>`;
    return new Response(request.method === "HEAD" ? null : body, {
      status: 404,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "private, no-store",
        "x-content-type-options": "nosniff",
      },
    });
  }
  return response;
}

export const GET = respond;
export const HEAD = respond;
export const POST = respond;
