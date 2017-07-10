package application.controller.snippet;

import application.Main;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

/**
 * Controllerklasse für das Projektsnippets aus der Projektwelt
 * @author Leonid Vilents
 *
 */
public class ProjectOverviewController {
	
	private int projectId;
	
	@FXML
	private Label titleLabel;
	
	/**
	 * Weist die Werte zu.
	 * @param pId	Projekt-ID
	 * @param title	Projekttitel
	 */
	public void initWithData(int pId, String title){
		this.projectId = pId;
		titleLabel.setText(title);
	}
	
	@FXML
	protected void viewProject(ActionEvent event) {
		Main.layoutManager.getSingleProjectTab(projectId);
	}
}
