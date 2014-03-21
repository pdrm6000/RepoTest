using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using App.CrossCutting.Authentication;

namespace App.Rest.Controllers
{
	public class AuthenticationRestController : ApiController
	{
		private readonly ITwitterAuthenticationService _twitterAuthenticationService;

		public AuthenticationRestController(ITwitterAuthenticationService twitterAuthenticationService)
		{
			_twitterAuthenticationService = twitterAuthenticationService;
		}

		[HttpGet]
		public HttpResponseMessage TwitterAuthentication(string callbackUrl)
		{
			var url = _twitterAuthenticationService.GetLoginUrl();
			var response = Request.CreateResponse(HttpStatusCode.Moved);
			HttpContext.Current.Session.Add("twitterCallBackUrl", callbackUrl);
			response.Headers.Location = new Uri(url);
			return response;
		}

		[HttpGet]
		public HttpResponseMessage CompleteTwitterAuthentication(string oauth_token, string oauth_verifier)
		{
			var user = _twitterAuthenticationService.Login(oauth_token, oauth_verifier);
			FormsAuthentication.SetAuthCookie(user.Login, true);
			var response = Request.CreateResponse(HttpStatusCode.Moved);
			response.Headers.Location = new Uri(HttpContext.Current.Session["twitterCallBackUrl"].ToString());
			return response;
		}
	}
}