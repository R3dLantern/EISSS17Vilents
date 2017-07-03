package application.controller.casemodder;

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

/**
 * Controllerklasse für die Casemodder-Projektwelt
 * @author Léon
 */
public class ProjectsController {
	
	@FXML
	private TextField searchField;
	
	@FXML
	private Button searchButton;
	
	@FXML
	private Pagination projectsPagination;
	
	@FXML
	private Pagination ownProjectsPagination;
	
	private String[] fonts = new String[]{};
	
	private int getItemsPerPage()
	{
		return 5;
	}
	
	@FXML
	protected void initialize()
	{
		fonts = Font.getFamilies().toArray(fonts);
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
        anchor.getChildren().addAll(projectsPagination);
	}
	
	public void initWithData(int id){
		
	}
	
	
	private VBox createPage(int pageIndex)
	{
		VBox box = new VBox(5);
		int page = pageIndex * getItemsPerPage();
		for(int i = page; i < page + getItemsPerPage(); i++) {
			Label font = new Label(fonts[i]);
			box.getChildren().add(font);
		}
		return box;
	}
}
