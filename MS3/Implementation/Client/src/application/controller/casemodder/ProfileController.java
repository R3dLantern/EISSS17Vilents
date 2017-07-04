package application.controller.casemodder;

import org.json.JSONException;

import application.controller.IProfileController;
import application.util.EBoolean;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import model.HttpResponse;

/**
 * Controllerklasse f�r die Casemodder-Profil�bersicht
 * @author Leonid Vilents
 */
public class ProfileController implements IProfileController{
	
	@FXML
	private ImageView profilePicture;
	
	@FXML
	private Label nameLabel;
	
	@FXML
	private Label descriptionLabel;
	
	@FXML
	private Label repLabel;
	
	@FXML
	private AnchorPane scrollContent;
	
	@FXML
	private Button editButton;
	
	@FXML
	private Button contactButton;
	
	/*
	 * (non-Javadoc)
	 * @see application.controller.IProfileController#initWithData(int)
	 */
	@Override
	public void initWithData(int id) {
		ServerRequest req = new ServerRequest(EURI.PROFILE_CM.uri(), id);
		
		HttpResponse res = req.get();
		
		try{
			if((!res.getContent().isNull("vorname")) && (!res.getContent().isNull("nachname"))){
				nameLabel.setText(String.format("%s %s", res.getContent().getString("vorname"), res.getContent().getString("nachname")));
			}
			descriptionLabel.setText(res.getContent().getString("beschreibung"));
			repLabel.setText(Integer.toString(res.getContent().getInt("totalRep")));
			if(res.getContent().getBoolean("userOwnsProfile") == EBoolean.PROFILE_OWNER.value()) {
				contactButton.setVisible(false);
			} else {
				editButton.setVisible(false);
			}
			//TODO: Projekte einbinden
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
