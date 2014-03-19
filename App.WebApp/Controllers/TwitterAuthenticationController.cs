using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Newtonsoft.Json;
using TweetSharp;

namespace App.WebApp.Controllers
{
	public class TwitterAuthenticationController : Controller
	{
		public ActionResult Authorize()
		{
			// Step 1 - Retrieve an OAuth Request Token
			TwitterService service = new TwitterService("ZDvqm68goomg4XnOUZjRWg", "PSNcQwMvDD0p2uaoyJVsgWkyYt8FhyHpmiG867bJ0");

			// This is the registered callback URL
			OAuthRequestToken requestToken = service.GetRequestToken("http://127.0.0.1:81/App.WebApp/TwitterAuthentication/AuthorizeCallback");

			// Step 2 - Redirect to the OAuth Authorization URL
			Uri uri = service.GetAuthorizationUri(requestToken);
			return new RedirectResult(uri.ToString(), false /*permanent*/);
		}

		// This URL is registered as the application's callback at http://dev.twitter.com
		public ActionResult AuthorizeCallback(string oauth_token, string oauth_verifier)
		{
			var requestToken = new OAuthRequestToken { Token = oauth_token };

			// Step 3 - Exchange the Request Token for an Access Token
			TwitterService service = new TwitterService("ZDvqm68goomg4XnOUZjRWg", "PSNcQwMvDD0p2uaoyJVsgWkyYt8FhyHpmiG867bJ0");
			OAuthAccessToken accessToken = service.GetAccessToken(requestToken, oauth_verifier);

			// Step 4 - User authenticates using the Access Token
			service.AuthenticateWith(accessToken.Token, accessToken.TokenSecret);
			TwitterUser user = service.VerifyCredentials(new VerifyCredentialsOptions());
			Session.Add("twitterUser", user);
			FormsAuthentication.SetAuthCookie(user.ScreenName, true);
			return new RedirectResult("http://127.0.0.1:81/App.WebApp/");
		}


		// This URL is registered as the application's callback at http://dev.twitter.com
		public string GetTwitterUser()
		{
			var jsSerializer = new JavaScriptSerializer();
			return jsSerializer.Serialize(Session["twitterUser"]);
		}
	}
}
