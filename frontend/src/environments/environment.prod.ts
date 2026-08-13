// Production-Build (Vercel).
// - apiUrl: die Render-Backend-URL
// - authToken: wird von @ngx-env/builder beim Build aus der Vercel-Env-Var
//   NG_APP_AUTH_TOKEN eingesetzt (muss derselbe Wert wie APP_TOKEN in Render sein)
export const environment = {
  apiUrl: 'https://shadowapp-jihj.onrender.com',
  authToken: process.env['NG_APP_AUTH_TOKEN'] || ''
};
