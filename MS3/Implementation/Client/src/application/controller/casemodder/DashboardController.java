package application.controller.casemodder;

import org.json.JSONException;
import org.json.JSONObject;

import application.controller.IDashboardController;
import application.util.EURI;
import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import model.HttpResponse;

/**
 * Controller-Klasse f�r das Casemodder-Dashboard
 * @author Leonid Vilents
 */
public class DashboardController implements IDashboardController{
	
	@FXML
	private Pane eventPane;
	
	@FXML
	private Label repLabel;
	
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
		
		//TODO Events implementieren
		
		try {
			JSONObject content = res.getContent();
			repLabel.setText(Integer.toString(content.getInt("rep")));
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
