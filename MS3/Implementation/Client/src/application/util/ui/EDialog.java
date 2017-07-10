package application.util.ui;

/**
 * Dialogtexte
 * @author Leonid Vilents
 */
public enum EDialog {
		
	TITLE_SIGNOUT ("Accountl�schung"),
	TITLE_DELETE_MESSAGE ("Best�tigung"),
	TITLE_SENT_MESSAGE ("Deine Nachricht"),
	TITLE_SEEK_STATUS ("Dein Suchstatus"),
	TITLE_SEEK_STATUS_SET ("Dein Suchstatus"),
	TITLE_NEW_PROJECT ("Neues Projekt"),
	HEADER_SENT_MESSAGE("Erfolg"),
	HEADER_SIGNOUT ("Benutzerkonto gel�scht"),
	HEADER_DELETE_MESSAGE ("Nachricht l�schen?"),
	HEADER_SEEK_STATUS ("Sponsorsuchstatus setzen?"),
	HEADER_SEEK_STATUS_SET ("Suchstatus erfolgreich gesetzt"),
	HEADER_NEW_PROJECT ("Neues Projekt angelegt"),
	CONTENT_DELETE_MESSAGE ("M�chtest Du diese Nachricht l�schen?"),
	CONTENT_SIGNOUT ("Du hast Dein Benutzerkonto gel�scht. Bis bald!"),
	CONTENT_SENT_MESSAGE ("Deine Nachricht wurde erfolgreich abgeschickt."),
	CONTENT_SEEK_STATUS (
		"Das Setzen des Sponsorsuchstatus bedeutet, dass Sponsoren dies sehen "
		+ "und Dich in ein Team einladen k�nnen. Bist Du sicher, dass Du das m�chtest?"),
	CONTENT_SEEK_STATUS_SET ("Du hast Deinen Sponsorsuchstatus erfolgreich gesetzt. Viel Erfolg!"),
	CONTENT_NEW_PROJECT ("Projekt wurde erfolgreich angelegt.");
	
	private String text;
	
	EDialog(String text) { this.text = text; }
	
	public String text() { return this.text; }
}
