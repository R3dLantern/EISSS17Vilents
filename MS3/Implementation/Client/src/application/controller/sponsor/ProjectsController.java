package application.controller.sponsor;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;
import application.util.conn.EURI;
import application.util.conn.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Pagination;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.VBox;

public class ProjectsController {
	
	@FXML
	private TextField searchField;
	
	@FXML
	private Button searchButton;
	
	@FXML
	private Pagination projectsPagination;
	
	@FXML
	private AnchorPane latestAnchorPane;
	
	@FXML
	private Pagination ownProjectsPagination;
	
	@FXML
	private AnchorPane ownedAnchorPane;
	
	private int getItemsPerPage()
	{
		return 3;
	}
	
	public void initialize() {
		
		ServerRequest req = new ServerRequest(EURI.PROJECTS.uri());
		
		try {
			JSONObject content = req.get().getContent();
			
			JSONArray latest = content.getJSONArray("latestProjects");
			JSONArray team = content.getJSONArray("teamProjects");
			
			int latestLen =  latest.length();
			int teamLen = team.length();
			
			projectsPagination.setPageCount((Integer) (latestLen / getItemsPerPage()) + 1);
			ownProjectsPagination.setPageCount((Integer) (teamLen / getItemsPerPage()) + 1);
			
			projectsPagination.setPageFactory((Integer pageIndex) -> createPage(pageIndex, latest));
			ownProjectsPagination.setPageFactory((Integer pageIndex) -> createPage(pageIndex, team));
			
		} catch (JSONException e) {
			e.printStackTrace();
			return;
		}
	}

	/**
	 * Erzeugt eine Seite f�r die Pagination einer Projektliste.
	 * @param pageIndex Seitenindex
	 * @param array JSONArray mit Projekten
	 * @return VBox mit fertigen Teillisten
	 */
	private VBox createPage(int pageIndex, JSONArray array)
	{
		if(array == null){
			return new VBox();
		}
		VBox box = new VBox();
		int page = pageIndex * getItemsPerPage();
		try {
			for (int i = page; i < Math.min((page + getItemsPerPage()), array.length()); i++) {
				if(array.getJSONObject(i) != null) {
					JSONObject project = array.optJSONObject(i);
					Pane pOverview = Main.snippetLoader.getProjectOverviewSnippet(
						project.getInt("id"),
						project.getString("titel")
					);
					box.getChildren().add(pOverview);
				}
			}
			return box;
		} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}
}
