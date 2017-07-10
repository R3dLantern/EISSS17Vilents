package application.controller;

import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.EBoolean;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import model.HttpResponse;

/** 
 * Controllerklasse für Projekte
 * @author Leonid Vilents
 */
public class ProjectController {
	
	private int userId;
	
	@FXML
	private Label titleLabel;
	
	@FXML
	private Hyperlink nameLink;
	
	public void initWithData(int pId) {
		ServerRequest req = new ServerRequest(EURI.PROJECT.uri(), pId);
		
		HttpResponse res = req.get();
		JSONObject resContent = res.getContent();
		if(resContent != null) {
			try{
				titleLabel.setText(resContent.getString("titel"));
				userId = resContent.getInt("casemodder_id");
				nameLink.setText(String.format("%s %s", resContent.getString("vorname"), resContent.getString("nachname")));
			} catch (JSONException je) {
				je.printStackTrace();
				return;
			}
		}
	}
	
	/**
	 * Gibt den Projekttitel aus dem Label zurück.
	 * @return Projekttitel
	 */
	public String getTitle()
	{
		return titleLabel.getText();
	}
	
	
	@FXML
	protected void viewProfile()
	{
		Main.layoutManager.getProfileTabContent(userId, EBoolean.CASEMODDER.value());
	}
}
