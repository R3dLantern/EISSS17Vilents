package application.controller.snippet;

import application.Main;
import application.util.ui.LayoutManager;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;

/**
 * Controllerklasse f�r Dashboard-Benachrichtigungssnippets
 * @author Leonid Vilents
 */
public class DashboardEventController {
	
	@FXML
	private AnchorPane eventRoot;
	
	@FXML
	private Label eventLabel;
	
	@FXML
	private Hyperlink eventLink;
	
	public void initNewMessagesEvent(int count)
	{
		switch(count) {
		case 1:
			eventLabel.setText("Eine neue Nachricht.");
			break;
		default:
			eventLabel.setText(String.format("%d neue Nachrichten.", count));
			break;
		}
		
		eventLink.setText("Zum Postfach");
		eventLink.setOnAction(new EventHandler<ActionEvent>() {
			public void handle(ActionEvent event)
			{
				LayoutManager.tabPane.getSelectionModel().select(2);
			}
		});
	}
	
	public void initNewCommentOnProjectEvent(int pId, String pTitle)
	{
		eventLabel.setText(String.format("neuer Kommentar bei %s", pTitle));
		
		eventLink.setText("Ansehen");
		eventLink.setOnAction(new EventHandler<ActionEvent>() {
			public void handle(ActionEvent event)
			{
				Main.layoutManager.getSingleProjectTab(pId, Main.layoutManager.getUserId());
			}
		});
	}
	
	@FXML
	protected void deleteNotification() {
		((Pane) eventRoot.getParent()).getChildren().remove(eventRoot);
	}
}
