package application.controller.casemodder;

import org.json.JSONException;
import org.json.JSONObject;

import application.util.ServerRequest;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Pagination;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.util.Callback;
import model.HttpResponse;

/**
 * Controllerklasse für die Casemodder-Projektwelt
 * @author Léon
 */
public class ProjectsController {
	
	private final String PROJECTS_STRING = "http://%s:%s/projects/index/1";
	
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
	
	@FXML
	protected void initialize()
	{
		/*fonts = Font.getFamilies().toArray(fonts);
		projectsPagination.setStyle("-fx-border-color:red;");
		projectsPagination.setPageFactory(new Callback<Integer, Node>() {
			
			@Override
			public Node call(Integer pageIndex)
			{
				return createPage(pageIndex);
			}
		});
		AnchorPane anchor = new AnchorPane();
        AnchorPane.setTopAnchor(projectsPagination, 10.0);
        AnchorPane.setRightAnchor(projectsPagination, 10.0);
        AnchorPane.setBottomAnchor(projectsPagination, 10.0);
        AnchorPane.setLeftAnchor(projectsPagination, 10.0);
        anchor.getChildren().addAll(projectsPagination);*/
	}
	
	public void initWithData(){
		ServerRequest req = new ServerRequest(PROJECTS_STRING);
		
		try {
			JSONObject content = new JSONObject(req.get().getContent());
			projectsPagination.setPageCount((Integer) (content.getJSONArray("latestProjects").length() / getItemsPerPage()) + 1);
			ownProjectsPagination.setPageCount((Integer) (content.getJSONArray("ownedProjects").length() / getItemsPerPage()) + 1);
			System.out.println(content.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	/*private VBox createPage(int pageIndex)
	{
		
	}*/
}
