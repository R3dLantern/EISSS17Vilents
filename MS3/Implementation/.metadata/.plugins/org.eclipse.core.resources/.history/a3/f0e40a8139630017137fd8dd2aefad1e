package application.controller.sponsor;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.CandidatePicker;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import model.HttpResponse;

/**
 * Controllerklasse für die Sponsoringwelt
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
		
		try {
			if(res.getContent().getJSONArray("results").length() > 0) {
				applicantsContent.setPrefWidth(0);
				JSONArray applicants = res.getContent().getJSONArray("results");
				for(int i = 0; i < applicants.length(); i++) {
					JSONObject applicant = applicants.getJSONObject(i);
					AnchorPane snippet = Main.snippetLoader.getSponsoringApplicantSnippet(applicant.getInt("id"), applicant.getInt("rep"), applicant.getString("vorname"), applicant.getString("nachname"));
					applicantsContent.getChildren().add(snippet);
				}
				
				CandidatePicker picker = new CandidatePicker();
				JSONArray topCandidates = picker.getCandidatesForTopChoice(applicants);
				for(int j = 0; j < topCandidates.length(); j++) {
					JSONObject candidate = topCandidates.getJSONObject(j);
					AnchorPane candidateSnippet = Main.snippetLoader.getSponsoringCandidateSnippet(candidate.getInt("id"), candidate.getInt("rep"));
					candidatesContent.getChildren().add(candidateSnippet);
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
