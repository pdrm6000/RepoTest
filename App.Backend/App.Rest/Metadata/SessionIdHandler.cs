using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace App.Rest.Metadata
{
    public class SessionIdHandler : DelegatingHandler
    {
        public static string SessionIdToken = "session-id";

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            string sessionId;
            // Try to get the session ID from the request; otherwise create a new ID.
            var cookie = request.Headers.GetCookies(SessionIdToken).FirstOrDefault();
            if (cookie == null)
            {
                sessionId = Guid.NewGuid().ToString();
            }
            else
            {
                sessionId = cookie[SessionIdToken].Value;
                Guid tempGuid;
                if (!Guid.TryParse(sessionId, out tempGuid))
                {
                    // Bad session ID. Create a new one.
                    sessionId = Guid.NewGuid().ToString();
                }
            }
            // Store the session ID in the request property bag.
            request.Properties[SessionIdToken] = sessionId;
            // Continue processing the HTTP request.
            var response = await base.SendAsync(request, cancellationToken);
            // Set the session ID as a cookie in the response message.
            response.Headers.AddCookies(new[] { new CookieHeaderValue(SessionIdToken, sessionId) });
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
            response.Headers.Add("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
            return response;
        }

    }
}