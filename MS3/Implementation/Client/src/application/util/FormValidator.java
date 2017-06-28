package application.util;

import java.time.LocalDate;
import java.time.Period;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hilfesklasse f�r Validierung von Form-�hnlichen Objekten
 * @author L�on
 *
 */
public class FormValidator {
	
	// RegEx-Matchstrings
	private final String regexEmail = "^.+@.+(\\.[^\\.]+)+$";
	private final String regexPassword = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}";
	private final String regexPdf = "^.+.([pP][dD][fF])$";
	
	private final String alertPasswordSemanticallyWeak = "Das Passwort sollte aus Klein- und Gro�buchstaben, Zahlen und Sonderzeichen bestehen.";
	private final String alertPasswordTooShort = "Das Passwort sollte mindestens aus 8 Zeichen bestehen.";
	
	private final String alertNotAPdfFile = "Die Datei scheint keine PDF-Datei zu sein.";
	private final String alertCasemodderUnderage = "Die Registrierung f�r Casemodder erfordert ein Mindestalter von 16 Jahren";
	private final String alertSponsorUnderage = "Die Registrierung f�r Sponsoren erfordert ein Mindestalter von 18 Jahren.";

	public static final String NO_EMAIL_ENTERED = "Bitte Email eingeben";
	public static final String INVALID_EMAIL_ENTERED = "Bitte g�ltige Email eingeben";
	public static final String NO_EMAIL_SPECIFIED = "Bitte eine Email angeben";
	public static final String INVALID_EMAIL_SPECIFIED = "Bitte g�ltige Email angeben";
	public static final String NO_PASSWORD_ENTERED = "Bitte Passwort eingeben";
	public static final String NO_PASSWORD_SPECIFIED = "Bitte Passwort angeben";
	public static final String NO_DATE_OF_BIRTH_SPECIFIED = "Bitte Geburtsdatum angeben";
	public static final String NO_FILE_SPECIFIED = "Bitte Datei ausw�hlen";
	
	/**
	 * �berpr�ft eine Email-Adresse auf Vorhandensein und semantische G�ltigkeit
	 * @param email zu �berpr�fende Email
	 * @param isLogin Flag zur Ermittlung von Login oder Signup-Scene
	 * @return leerer String oder FehlerString
	 */
	public String validateEmail(String email, boolean isLogin)
	{
		if (email.isEmpty()) {
			return isLogin ? NO_EMAIL_ENTERED : NO_EMAIL_SPECIFIED;
		}
		
		Pattern pattern = Pattern.compile(regexEmail);
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches()) {
			return isLogin ? INVALID_EMAIL_ENTERED : INVALID_EMAIL_SPECIFIED;
		}
		return "";
	}
	
	/**
	 * �berpr�ft ein Passwort auf Vorhandensein, und optional auf semantische St�rke
	 * @param password Zu pr�fendes Passwort
	 * @param isLogin bestimmt, ob semantische St�rke gepr�ft werden soll
	 * @return Fehlermeldung als String, oder leeren String
	 */
	public String validatePassword(String password, boolean isLogin)
	{
		if (password.isEmpty()) {
			return isLogin ? NO_PASSWORD_ENTERED : NO_PASSWORD_SPECIFIED;
		}
		
		if (!isLogin) {
			Pattern pattern = Pattern.compile(regexPassword);
			Matcher matcher = pattern.matcher(password);
			if (!matcher.matches()) {
				return alertPasswordSemanticallyWeak;
			}
			
			if (password.length() < 8) {
				return alertPasswordTooShort;
			}
		}
		
		return "";
	}
	
	/**
	 * Validiert das Geburtsdatum basierend auf Sponsor- oder Casemodder-Registrierungen
	 * @param dateOfBirth Geburtsdatum
	 * @return leeren String oder Fehlerstring
	 */
	public String valiateDateOfBirth(LocalDate dateOfBirth, boolean isSponsor)
	{
		return this.calculateAge(dateOfBirth) < (isSponsor ? 18: 16) ? (isSponsor ? alertSponsorUnderage : alertCasemodderUnderage) : "";
	}
	
	
	/**
	 * Pr�ft, ob ein Dateipfad auf eine PDF verweist
	 * @param filePath der Dateipfad
	 * @return leeren String oder Fehlerstring
	 */
	public String validateFile(String filePath)
	{
		if (filePath.isEmpty()) {
			return NO_FILE_SPECIFIED;
		}
		
		Pattern pattern = Pattern.compile(regexPdf);
		Matcher matcher = pattern.matcher(filePath);
		return matcher.matches() ? "" : alertNotAPdfFile;
	}
	
	
	/**
	 * Berechnet die Differenz in Jahren zwischen einem Datum und dem heutigen Datum
	 * @param date Datum im Minuend
	 * @return int Differenz in Jahren
	 * @throws NullPointerException
	 */
	private int calculateAge(LocalDate date) throws NullPointerException
	{
		return Period.between(date, LocalDate.now()).getYears();
	}
}