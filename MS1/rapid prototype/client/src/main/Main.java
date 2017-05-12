package main;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

/**
 * Hauptklasse für den Java-basierten Client des Rapid Prototype
 * Programmiert im Rahmen des Entwicklungsprojekt Interaktive Systeme-Moduls
 * Sommersemester 2017
 * @author Leonid Vilents
 * @version 1.0
 */
public class Main extends Application
{	
	// Verbindungsvariablen sollten nicht verändert werden
	public final String SERVER_IP = "127.0.0.1";
	public final int SERVER_PORT = 8000;
	
	@Override
	public void start(Stage primaryStage)
	{
		Font standardFont = Font.font("Calibri", FontWeight.NORMAL, 14);
		
		GridPane grid = new GridPane();
		grid.setAlignment(Pos.CENTER);
		grid.setHgap(10);
		grid.setVgap(10);
		grid.setPadding(new Insets(25,25,25,25));
	
		Text sceneTitle = new Text("Rapid Prototype");
		sceneTitle.setFont(Font.font("Calibri", FontWeight.NORMAL, 20));
		grid.add(sceneTitle, 0, 0, 2, 1);
	
		Label userName = new Label("Username:");
		userName.setFont(standardFont);
		grid.add(userName, 0, 2);
		 
		TextField usernameText = new TextField();
		usernameText.setFont(standardFont);
		grid.add(usernameText, 1, 2);
		 
		final Text actiontarget = new Text();
		grid.add(actiontarget, 1, 7);
		 
		Button btn = new Button("Reputation");
		HBox hbBtn = new HBox(10);
		hbBtn.setAlignment(Pos.BOTTOM_RIGHT);
		hbBtn.getChildren().add(btn);
		grid.add(hbBtn, 1, 4);
		 
		btn.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle (ActionEvent event)
			{
				if(usernameText.getLength() > 0) {
					actiontarget.setFill(Color.BLACK);
					int totalReputation = getTotalReputationFor(usernameText.getText());
					switch(totalReputation){
						case -404:
							setActiontargetErrorOutput(actiontarget, "Der Username wurde nicht gefunden.");
							break;
						case -1:
							setActiontargetErrorOutput(actiontarget, "Verbindungsfehler.");
							break;
						default:
							actiontarget.setText(String.format("Die Gesamtreputation von %s beträgt %d", usernameText.getText(), totalReputation));
							break;
					}
	    		} else {
	    			setActiontargetErrorOutput(actiontarget, "Es wurde kein Username angegeben.");
	    		}
			}
		});
	     
		Scene scene = new Scene(grid, 640, 480);

		primaryStage.setTitle("EISSS17Vilents Rapid Prototye");
		primaryStage.setScene(scene);
		primaryStage.show();
	}
	 
	/**
	 * Main-Funktion zum Starten der Anwendung
	 */
	public static void main(String[] args)
	{
		launch(args);
	}
	 
	/**
	 * Sendet eine Anfrage an den Server zur Berechnung der Gesamtreputation.
	 * @param username Der Benutzername des Benutzers
	 * @return die vom Server erhaltene Gesamtreputation des Benutzers
	 */
	int getTotalReputationFor(String username)
	{
		HttpURLConnection conn = null;
		
		try {
			URL url = new URL(String.format("http://%s:%s/users/%s", this.SERVER_IP, this.SERVER_PORT, username));
			conn = (HttpURLConnection) url.openConnection();
			
			int responseCode = conn.getResponseCode();
			
			System.out.println("\nSending 'GET' request to URL : " + url);
			System.out.println("Response Code : " + responseCode);
			
			// bei Status 404 abbrechen
			if(responseCode == 404){
				if (conn != null) {
					conn.disconnect();
				}
				return -404;
			}
	
			BufferedReader in = new BufferedReader(
			        new InputStreamReader(conn.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();
			
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
			
			return Integer.parseInt(response.toString());
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		} finally {
			if (conn != null) {
				conn.disconnect();
			}
		}
	}
	
	/**
	 * Helfer-Funktion für den Fehler-Output des actiontarget-Textfeldes
	 * @param target das zu übergebende Textfeld
	 * @param message der Fehler
	 */
	void setActiontargetErrorOutput(Text target, String message){
		target.setFill(Color.FIREBRICK);
		target.setText(message);
		return;
	}
}
