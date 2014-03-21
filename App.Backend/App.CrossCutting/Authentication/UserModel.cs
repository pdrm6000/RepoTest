namespace App.CrossCutting.Authentication
{
	public class UserModel
	{
		public string Login { get; set; }
		public string Name { get; set; }
		public object SocialInstance { get; set; }
	}
}
