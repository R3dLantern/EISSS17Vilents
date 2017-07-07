package application.controller.casemodder;

import java.util.Optional;

import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.controller.IDashboardController;
import application.util.EURI;
import application.util.ServerRequest;
import application.util.ui.DialogCreator;
import application.util.ui.EDialog;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import model.HttpResponse;

/**
 * Controller-Klasse für das Casemodder-Dashboard
 * @author Leonid Vilents
 */
public class DashboardController implements IDashboardController{
		
	@FXML
	private Pane eventPane;
	
	@FXML
	private Label repLabel;
	
	@FXML
	private Pane seekStatusPane;
	
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
		
		try {
			JSONObject content = res.getContent();
			repLabel.setText(Integer.toString(content.getInt("rep")));
			seekStatusPane.setVisible(content.getBoolean("canActivateSeekStatus"));
			
			if(content.getInt("newMessages") > 0) {
				int count = content.getInt("newMessages");
				eventPane.getChildren().add(Main.snippetLoader.getNewMessageDashboardEvent(count));
			}
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Aktiviert den Sponsorsuchstatus
	 */
	@FXML
	protected void activateSeekStatus()
	{
		Alert conf = DialogCreator.getYesNoConfirmation(
			EDialog.TITLE_SEEK_STATUS.text(),
			EDialog.HEADER_SEEK_STATUS.text(),
			EDialog.CONTENT_SEEK_STATUS.text()
		);
		Optional<ButtonType> result = conf.showAndWait();
		
		if (result.get() == conf.getButtonTypes().get(0)) {
			ServerRequest req = new ServerRequest(EURI.SEEKSTATUS.uri());
			
			HttpResponse res = req.get();
			if (res.getStatusCode() == 201) {
				Alert info = DialogCreator.getInfo(
					EDialog.TITLE_SEEK_STATUS_SET.text(),
					EDialog.HEADER_SEEK_STATUS_SET.text(),
					EDialog.CONTENT_SEEK_STATUS_SET.text()
				);
				info.showAndWait();
			}
		} else {
			return;
		}
	}
}
