package application.controller.casemodder;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.controller.IProfileController;
import application.util.EBoolean;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import model.HttpResponse;

/**
 * Controllerklasse f�r die Casemodder-Profil�bersicht
 * @author Leonid Vilents
 */
public class ProfileController implements IProfileController{
	
	private int profileId;
	
	@FXML
	private ImageView profilePicture;
	
	@FXML
	private Label nameLabel;
	
	@FXML
	private Label homeLabel;
	
	@FXML
	private Label descriptionLabel;
	
	@FXML
	private Label repLabel;
	
	@FXML
	private Button editButton;
	
	@FXML
	private Button contactButton;
	
	@FXML
	private HBox projectBox;
	
	/*
	 * (non-Javadoc)
	 * @see application.controller.IProfileController#initWithData(int)
	 */
	@Override
	public void initWithData(int id) {
		
		this.profileId = id;
		
		ServerRequest req = new ServerRequest(EURI.PROFILE_CM.uri(), id);
		
		HttpResponse res = req.get();
		
		try{
			if ((!res.getContent().isNull("vorname")) && (!res.getContent().isNull("nachname"))){
				nameLabel.setText(String.format("%s %s", res.getContent().getString("vorname"), res.getContent().getString("nachname")));
			}
			if (!res.getContent().isNull("wohnort")) {
				homeLabel.setText(res.getContent().getString("wohnort"));
			}
			descriptionLabel.setText(res.getContent().getString("beschreibung"));
			repLabel.setText(Integer.toString(res.getContent().getInt("totalRep")));
			if(res.getContent().getBoolean("userOwnsProfile") == EBoolean.PROFILE_OWNER.value()) {
				contactButton.setVisible(false);
			} else {
				editButton.setVisible(false);
			}
			if(res.getContent().getJSONArray("projekte").length() > 0) {
				projectBox.setPrefWidth(0);
				JSONArray projects = res.getContent().getJSONArray("projekte");
				for(int i = 0; i < projects.length(); i++) {
					JSONObject object = projects.getJSONObject(i);
					AnchorPane snippet = Main.snippetLoader.getProfileProjectSnippet(object.getInt("id"), object.getString("titel"));
					projectBox.setPrefWidth(((i + 1) * 210));
					projectBox.getChildren().add(snippet);
				}
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	@FXML
	protected void composeMessageToUser()
	{
		Main.layoutManager.getNewMessageTab(profileId, getName());
	}
	
	@Override
	public String getName()
	{
		return nameLabel.getText();
	}
}
