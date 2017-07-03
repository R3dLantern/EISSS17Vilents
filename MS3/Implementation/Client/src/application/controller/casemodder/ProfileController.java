package application.controller.casemodder;

import org.json.JSONException;
import org.json.JSONObject;

import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import model.HttpResponse;

public class ProfileController {

	private final String PROFILE_STRING = "http://%s:%s/profiles/casemodder/";
	
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
	
	@FXML
	protected void initialize(){
		
	}
	
	public void initWithData(int id) {
		ServerRequest req = new ServerRequest(PROFILE_STRING + id);
		
		HttpResponse res = req.get();
		
		try{
			JSONObject content = new JSONObject(res.getContent());
			nameLabel.setText(String.format("%s %s", content.getString("vorname"), content.getString("nachname")));
			descriptionLabel.setText(content.getString("beschreibung"));
			repLabel.setText(Integer.toString(content.getInt("totalRep")));
			if(content.getBoolean("userOwnsProfile") == true) {
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
