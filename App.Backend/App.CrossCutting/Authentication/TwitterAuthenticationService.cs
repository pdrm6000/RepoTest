using System;
using System.Configuration;
using TweetSharp;

namespace App.CrossCutting.Authentication
{
	public class TwitterAuthenticationService : ITwitterAuthenticationService
	{
		public string GetLoginUrl()
		{
			// Step 1 - Retrieve an OAuth Request Token
			var service = new TwitterService(ConfigurationManager.AppSettings["twitterConsumerKey"], ConfigurationManager.AppSettings["twitterConsumerSecret"]);

			// This is the registered callback URL
			var requestToken = service.GetRequestToken(ConfigurationManager.AppSettings["twitterCallbackUrl"]);

			// Step 2 - Redirect to the OAuth Authorization URL
			var uri = service.GetAuthorizationUri(requestToken);
			return uri.ToString();
		}

		public UserModel Login(string oauthToken, string oauthVerifier)
		{
			var requestToken = new OAuthRequestToken { Token = oauthToken };

			// Step 3 - Exchange the Request Token for an Access Token
			var service = new TwitterService(ConfigurationManager.AppSettings["twitterConsumerKey"], ConfigurationManager.AppSettings["twitterConsumerSecret"]);
			var accessToken = service.GetAccessToken(requestToken, oauthVerifier);

			// Step 4 - User authenticates using the Access Token
			service.AuthenticateWith(accessToken.Token, accessToken.TokenSecret);
			TwitterUser user = service.VerifyCredentials(new VerifyCredentialsOptions());
			return new UserModel
				   {
					   Login = user.ScreenName,
					   Name = user.Name,
					   SocialInstance = user
				   };
		}
	}
}