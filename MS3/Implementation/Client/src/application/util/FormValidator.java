package application.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hilfesklasse f�r Validierung von Form-�hnlichen Objekten
 * @author L�on
 *
 */
public class FormValidator {
	
	private final String ALERT_PASSWORD_SEMANTICALLY_WEAK = "Das Passwort sollte aus Klein- und Gro�buchstaben, Zahlen und Sonderzeichen bestehen.";
	private final String ALERT_PASSWORD_TOO_SHORT = "Das Passwort sollte mindestens aus 8 Zeichen bestehen.";

	private final String EMAIL_REGEX = "^.+@.+(\\.[^\\.]+)+$";
	private final String PASSWORD_REGEX = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$";
	
	private final String NO_EMAIL_ENTERED = "Bitte Email eingeben";
	private final String INVALID_EMAIL_ENTERED = "Bitte g�ltige Email eingeben";
	
	private final String NO_PASSWORD_ENTERED = "Bitte Passwort eingeben";
	
	/**
	 * �berpr�ft eine Email-Adresse auf Vorhandensein und semantische G�ltigkeit
	 * @param email
	 * @return Statuscode
	 */
	public String validateEmail(String email)
	{
		if (email.isEmpty()) {
			return NO_EMAIL_ENTERED;
		}
		
		Pattern pattern = Pattern.compile(EMAIL_REGEX);
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches()) {
			return INVALID_EMAIL_ENTERED;
		}
		return "";
	}
	
	/**
	 * �berpr�ft ein Passwort auf Vorhandensein, und optional auf semantische St�rke
	 * @param password Zu pr�fendes Passwort
	 * @param validatePasswordStrength bestimmt, ob semantische St�rke gepr�ft werden soll
	 * @return Fehlermeldung als String, oder leeren String
	 */
	public String validatePassword(String password, boolean validatePasswordStrength)
	{
		if (password.isEmpty()) {
			return NO_PASSWORD_ENTERED;
		}
		
		if (validatePasswordStrength) {
			Pattern pattern = Pattern.compile(PASSWORD_REGEX);
			Matcher matcher = pattern.matcher(password);
			if (!matcher.matches()) {
				return ALERT_PASSWORD_SEMANTICALLY_WEAK;
			}
			
			if (password.length() < 8) {
				return ALERT_PASSWORD_TOO_SHORT;
			}
		}
		
		return "";
	}
}
