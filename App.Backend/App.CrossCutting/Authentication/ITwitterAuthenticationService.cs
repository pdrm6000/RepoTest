namespace App.CrossCutting.Authentication
{
	public interface ITwitterAuthenticationService
	{
		string GetLoginUrl();
		UserModel Login(string oauthToken, string oauthVerifier);
	}
}
