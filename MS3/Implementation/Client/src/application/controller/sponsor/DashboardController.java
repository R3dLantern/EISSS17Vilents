package application.controller.sponsor;

import application.controller.IDashboardController;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.layout.Pane;
import model.HttpResponse;

/**
 * Controllerklasse f�r das Sponsoren-Dashboard
 * @author Leonid Vilents
 */
public class DashboardController implements IDashboardController{
	
	@FXML
	private Pane eventPane;
	
	/*
	 * (non-Javadoc)
	 * @see application.controller.IDashboardController#initialize()
	 */
	@FXML
	@Override
	public void initialize()
	{
		ServerRequest req = new ServerRequest(EURI.DASHBOARD.uri());
		
		HttpResponse res = req.get();
		
		//TODO: Dashboard-Events implementieren
	}
}
