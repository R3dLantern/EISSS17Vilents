package application.controller.sponsor;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import model.HttpResponse;

/**
 * Controllerklasse f�r die Sponsoringwelt
 * @author Leonid Vilents
 */
public class SponsoringController {
	@FXML
	private HBox applicantsContent;
	
	@FXML
	private HBox candidatesContent;
	
	@FXML
	protected void initialize()
	{
		ServerRequest req = new ServerRequest(EURI.SPONSORING.uri());
		
		HttpResponse res = req.get();
		Main.log(res.getContent().toString());
		
		try {
			if(res.getContent().getJSONArray("results").length() > 0) {
				applicantsContent.setPrefWidth(0);
				JSONArray applicants = res.getContent().getJSONArray("results");
				for(int i = 0; i < applicants.length(); i++) {
					JSONObject applicant = applicants.getJSONObject(i);
					AnchorPane snippet = Main.snippetLoader.getSponsoringApplicantSnippet(applicant.getInt("id"), applicant.getInt("rep"), applicant.getString("vorname"), applicant.getString("nachname"));
					applicantsContent.setPrefWidth(((i + 1) * (snippet.getPrefWidth() + applicantsContent.getSpacing())));
					applicantsContent.getChildren().add(snippet);
				}
			}
		} catch (JSONException je) {
			je.printStackTrace();
		}
	}
	
	@FXML
	protected void handleCreateTopTeamButton()
	{
		
	}
	
	@FXML
	protected void handleMyTeamButton()
	{
		
	}
}
