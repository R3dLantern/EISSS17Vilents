package application.util.ui;

import java.io.IOException;
import java.util.UUID;

import application.controller.IProfileController;
import application.controller.ProjectController;
import application.util.EFXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.layout.Pane;

/**
 * Hilfsklasse für das Management des UI-Layouts und dem Anfordern von Daten
 * @author Leonid Vilents
 */
public class LayoutManager{
	
	private int userId;
	private boolean layoutForCasemodder;
	private TabPane tabPane;
	
	/**
	 * Konstruktor
	 * @param userId Benutzer-ID
	 * @param layoutForCasemodder Flag für Benutzertyp
	 */
	public LayoutManager(int userId, boolean layoutForCasemodder, TabPane tabPane) {
		this.userId = userId;
		this.layoutForCasemodder = layoutForCasemodder;
		this.tabPane = tabPane;
	}
	
	
	/**
	 * Gibt die initialisierte Dashboard-Pane zurück.
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getDashboardTabContent()
	{
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					layoutForCasemodder
					? EFXML.CM_DASHBOARD.fxml()
					: EFXML.SP_DASHBOARD.fxml()
				)				
			);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}

	
	/**
	 * Gibt die dynamisch initialisierte Profil-Pane zurück.
	 * @param isCasemodderProfile Flag für Benutzertyp
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getProfileTabContent(int userId, boolean isCasemodderProfile) {
		FXMLLoader loader = new FXMLLoader(
			getClass()
			.getResource(
				isCasemodderProfile
				? EFXML.CM_PROFILE.fxml()
				: EFXML.SP_PROFILE.fxml()
			)
		);
		try {
			Pane content = (Pane) loader.load();
			IProfileController controller = loader.<IProfileController>getController();
			controller.initWithData(userId);
			if(userId == this.userId) {
				return content;
			}
			Tab singleProjectTab = new Tab();
			singleProjectTab.setClosable(true);
			singleProjectTab.setContent(content);
			singleProjectTab.setText(controller.getName());
			tabPane.getTabs().add(singleProjectTab);
			tabPane.getSelectionModel().select(tabPane.getTabs().indexOf(singleProjectTab));
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Gibt die initialisierte Projektwelt-Pane zurück.
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getProjectsTabContent() {
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					layoutForCasemodder
					? EFXML.CM_PROJECTS.fxml()
					: EFXML.SP_PROJECTS.fxml()
				)
			);
		} catch(IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Gibt die initialisierte Nachrichten-Pane zurück.
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getMessagesTabContent() {
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					EFXML.MESSAGES.fxml()
				)
			);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Initialisiert die benutzerspezifische Sponsoringwelt-Pane und gibt diese zurück
	 * @return Initialisiertes Pane-Objekt
	 */
	public Pane getSponsoringTabContent() {
		try {
			return FXMLLoader.load(
				getClass()
				.getResource(
					EFXML.SP_SPONSORING.fxml()
				)
			);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * Initialisiert eine Projekt-Pane und gibt sie zurück
	 * @param projectId Projekt-ID
	 * @return Initialisiertes Pane-Objekt
	 */
	public void getSingleProjectTab(int projectId) {
		try {
			FXMLLoader loader = new FXMLLoader(
				getClass()
				.getResource(
					EFXML.PROJECT.fxml()
				)
			);
			Pane content = (Pane) loader.load();
			ProjectController controller = loader.<ProjectController>getController();
			controller.initWithData(projectId);
			Tab singleProjectTab = new Tab();
			singleProjectTab.setClosable(true);
			singleProjectTab.setContent(content);
			singleProjectTab.setText(controller.getTitle());
			singleProjectTab.setId("tab_" + UUID.randomUUID().toString());
			tabPane.getTabs().add(singleProjectTab);
			tabPane.getSelectionModel().select(singleProjectTab);
			return;
		} catch (IOException ie) {
			ie.printStackTrace();
			return;
		}
	}
}
