package application.controller.snippet;

import application.Main;
import application.util.EBoolean;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;

/**
 * Controllerklasse für Anwärter-Snippet in der Sponsoringwelt
 * @author Léon
 *
 */
public class SponsoringApplicantController {
	
	private int applicantId;
	
	@FXML
	private Label nameLabel;
	
	@FXML
	private Label repLabel;
	
	@FXML
	private ImageView profilePicture;
	
	/**
	 * Initialisiert das Snippet mit den Daten.
	 * @param applicantId	Benutzer-ID des Anwärters
	 * @param vorname		Vorname des Anwärters
	 * @param nachname		Nachname des Anwärters
	 */
	public void initWithData(int applicantId, int rep, String vorname, String nachname)
	{
		this.applicantId = applicantId;
		this.nameLabel.setText(String.format("%s %s", vorname, nachname));
		this.repLabel.setText(String.format("%d R", rep));
		// TODO: Bild setzen
	}
	
	@FXML
	protected void handleProfileButton()
	{
		Main.layoutManager.getProfileTabContent(applicantId, EBoolean.CASEMODDER.value());
	}
}
