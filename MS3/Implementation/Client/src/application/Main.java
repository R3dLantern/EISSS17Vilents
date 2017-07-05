package application;
	
import java.net.CookieHandler;
import java.net.CookieManager;
import java.net.HttpURLConnection;

import application.util.ui.LayoutManager;
import application.util.ui.SceneLoader;
import application.util.ui.SnippetLoader;
import javafx.application.Application;
import javafx.scene.control.TabPane;
import javafx.stage.Stage;


/**
 * Haupt-Applikationsklasse für die Client-Anwendung im
 * Rahmen der EIS-Veranstaltung im Sommersemester 2017
 * @author Leonid Vilents
 * @version 1.0
 */
public class Main extends Application
{
	public static final String SERVER_IP = "127.0.0.1";
	
	public static final int SERVER_PORT = 8000;
	
	public static HttpURLConnection conn;
	
	public static SceneLoader sceneLoader;
	
	public static SnippetLoader snippetLoader;
	
	public static LayoutManager layoutManager;
	
	
	/**
	 * Konfiguriert Primärfenster und Sceneloader, und initialisiert diesen.
	 */
	@Override
	public void start(Stage primaryStage)
	{
		primaryStage = this.configureStage(primaryStage);
		this.setSceneLoader(new SceneLoader(primaryStage));
		this.setSnippetLoader(new SnippetLoader());
		try {
			Main.sceneLoader.init();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * Hauptfunktion
	 * @param args Startargumente für Kommandozeile - obsolet
	 */
	public static void main(String[] args)
	{
		CookieHandler.setDefault(new CookieManager());
		launch(args);
	}
	
	
	/**
	 * Basiskonfiguration für das Applikationsfenster.
	 * @param target das zu konfigurierende Stage-Objekt
	 * @return konfiguriertes Stage-Objekt
	 */
	private Stage configureStage(Stage target)
	{
		target.setResizable(false);
		
		target.setWidth(800);
		target.setHeight(600);
		
		target.setTitle("EIS SS2017 Vilents");
		return target;
	}
	
	
	/**
	 * Setter für statischen SceneLoader
	 * @param primaryStage zu setzenden SceneLoader
	 */
	private void setSceneLoader(SceneLoader sceneLoader)
	{
		Main.sceneLoader = sceneLoader;
	}
	
	
	/**
	 * Setter für statischen SnippetLoader
	 * @param snippetLoader
	 */
	private void setSnippetLoader(SnippetLoader snippetLoader)
	{
		Main.snippetLoader = snippetLoader;
	}
	
	
	/**
	 * Initialisiert den LayoutManager.
	 * @param userId		ID des aktuellen Benutzers
	 * @param isCasemodder	Flag für Benutzertyp
	 * @param tabPane		TabPane für Tab-Management
	 */
	public static void initializeLayoutManager(int userId, boolean isCasemodder, TabPane tabPane)
	{
		Main.layoutManager = new LayoutManager(userId, isCasemodder, tabPane);
	}
	
	
	/**
	 * Verkürzte Konsolenlogger-Funktion, wird für Produktivumgebung entfernt.
	 * @param message String für Konsolenausgabe
	 */
	public static void log(String message)
	{
		System.out.println(message);
	}
}
