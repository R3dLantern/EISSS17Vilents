package application.util;

/**
 * Prüft, ob das Passwort eine ausreichende Stärke besitzt.
 * @author Léon
 *
 */
public class PasswordChecker {
	
	public static String checkPasswordStrength(String password)
	{
		if (password.matches("([^!?#§$%&@€A-Z].?)"))  {
			return "Das Passwort sollte aus Klein- und Großbuchstaben, sowie Zahlen und Sonderzeichen bestehen";
		}
		
		if (password.length() < 8) {
			return "Das Passwort sollte mindestens aus 8 Zeichen bestehen";
		}
		
		return "";
	}
}
