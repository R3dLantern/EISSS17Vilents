package application.controller.sponsor;

import application.Main;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
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
		Main.log(res.getContent().toString());
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
