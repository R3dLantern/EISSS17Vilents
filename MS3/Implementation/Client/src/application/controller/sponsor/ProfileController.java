package application.controller.sponsor;

import org.json.JSONException;

import application.controller.IProfileController;
import application.util.EBoolean;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import model.HttpResponse;

public class ProfileController implements IProfileController{

	@FXML
	private ImageView profilePicture;
	
	@FXML
	private Label nameLabel;
	
	@FXML
	private Label corpLabel;
	
	@FXML
	private Label descriptionLabel;
	
	@FXML
	private Button editButton;
	
	@FXML
	private Button contactButton;
	
	
	@Override
	public void initWithData(int id) {
		ServerRequest req = new ServerRequest(EURI.PROFILE_SP.uri(), id);
		
		HttpResponse res = req.get();
		try{
			if((!res.getContent().isNull("vorname")) && (!res.getContent().isNull("nachname"))){
				nameLabel.setText(String.format("%s %s", res.getContent().getString("vorname"), res.getContent().getString("nachname")));
			}
			descriptionLabel.setText(res.getContent().getString("beschreibung"));
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


	@Override
	public String getName() {
		return nameLabel.getText();
	}

}
