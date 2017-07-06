package application.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import application.Main;

/**
 * Berechnet ElementRankings von Benutzerlisten und errechnet so die bestmöglichen Kandidaten für die Top-Liste
 * @author Leonid Vilents
 *
 */
public class CandidatePicker {
	
	/**
	 * Sortiert ein JSONArray von Benutzern aufsteigend nach deren Gesamtreputation.
	 * @param applicants JSONArray mit Benutzer-JSONObjects
	 * @return Ein JSONArray mit exakt 3 Benutzer-JSONObjects, die die besten Rankings besitzen
	 */
	public JSONArray getCandidatesForTopChoice(JSONArray applicants)
	{
		try {
			// Nach Gesamtreputation sortieren
			QuickSorter.sort(applicants);
			// Es wird nur das obere Quartil an Daten betrachtet
			JSONArray arrayWithRankings = this.calculateRankings(this.getUpperQuartile(applicants));
			return getTopCandidatesBasedOnRankings(arrayWithRankings);
		} catch (JSONException je) {
			je.printStackTrace();
			return null;
		}
	}
	
	//TODO: Kandidaten basierend auf Ranking auswählen
	private JSONArray getTopCandidatesBasedOnRankings(JSONArray array) throws JSONException
	{
		Main.log(array.toString());
		// 3 Topkandidaten
		// 0: ProjektRanking Bester
		// 1: Projekt-Update-Kombintation Bester
		// 2: Kommentare Bester
		JSONArray topCandidates = new JSONArray();
		
		int lastIndex = array.length() - 1;
		// Sortiere das übergebene Array nach verschiedenen Rankings
		JSONArray sortedByHighestProjectUpdatesRanking = BubbleSorter.sort(array, "projectUpdatesRanking");
		JSONObject topCandidateProjectUpdates = sortedByHighestProjectUpdatesRanking.getJSONObject(lastIndex);
		topCandidates.put(topCandidateProjectUpdates);
		
		JSONArray sortedByHighestProjectsRanking = array;
		for(int i = 0; i < sortedByHighestProjectsRanking.length(); i++) {
			if(sortedByHighestProjectsRanking.getJSONObject(i).getInt("id") == topCandidateProjectUpdates.getInt("id")) {
				sortedByHighestProjectsRanking.remove(i);
				i = sortedByHighestProjectsRanking.length();
			}
		}
		
		lastIndex = sortedByHighestProjectsRanking.length() - 1;
		sortedByHighestProjectsRanking = BubbleSorter.sort(sortedByHighestProjectsRanking, "projectRanking");
		JSONObject topCandidateProjects = sortedByHighestProjectsRanking.getJSONObject(lastIndex);
		topCandidates.put(topCandidateProjects);
		
		
		JSONArray sortedByHighestCommentsRanking = sortedByHighestProjectsRanking;
		for(int i = 0; i < sortedByHighestCommentsRanking.length(); i++) {
			if(sortedByHighestCommentsRanking.getJSONObject(i).getInt("id") == topCandidateProjects.getInt("id")) {
				sortedByHighestCommentsRanking.remove(i);
				i = sortedByHighestCommentsRanking.length();
			}
		}
		
		lastIndex = sortedByHighestCommentsRanking.length() - 1;
		sortedByHighestCommentsRanking = BubbleSorter.sort(sortedByHighestCommentsRanking, "commentsRanking");
		JSONObject topCandidateComments = sortedByHighestCommentsRanking.getJSONObject(lastIndex);
		topCandidates.put(topCandidateComments);
		
		return topCandidates;
	}
	
	
	/**
	 * Berechnet anhand der Zählwerte im Objekt eines Arrays dessen Rankings
	 * im Hinblick auf Projekte, Projekt-Update-Kombination und Kommentare.
	 * @param array
	 * @return JSONArray mit erweiterten Benutzer-JSONObjects.
	 */
	private JSONArray calculateRankings (JSONArray array) throws JSONException
	{
		JSONArray arrayWithRankings = new JSONArray();
		
		for (int i = 0; i < array.length(); i++) {
			JSONObject userObject = array.getJSONObject(i);
			JSONObject counters = userObject.getJSONObject("counters");
				
			JSONObject rankings = new JSONObject();
			// Ranking für Projekte
			int projectCount = counters.getInt("projects");
			int projectUpvotesCount = counters.getInt("projectUpvotes");
			int projectRanking = (int) Math.floor((projectCount + projectUpvotesCount) /2);
			rankings.put("projectRanking", projectRanking);
				
			// Ranking für Projekt-Update-Kombinationen
			int projectUpdatesCount = counters.getInt("projectUpdates");
			int projectUpdateUpvotesCount = counters.getInt("projectUpdateUpvotes");
			int partialRanking = (int) Math.floor((projectUpdatesCount + projectUpdateUpvotesCount) /2);
			int projectUpdatesRanking = (int) Math.floor((projectRanking + partialRanking) / 2);
			rankings.put("projectUpdatesRanking", projectUpdatesRanking);
			
			// Ranking für Kommentare
			int commentsCount = counters.getInt("comments");
			int commentUpvotesCount = counters.getInt("commentUpvotes");
			int commentsRanking = (int) Math.floor((commentsCount + commentUpvotesCount) / 2);
			rankings.put("commentsRanking", commentsRanking);
				
			userObject.put("rankings", rankings);
				
			arrayWithRankings.put(userObject);
		}
		return arrayWithRankings;
	}
	
	/**
	 * Gibt das obere Quartil des JSONArrays im Parameter als neues JSONArray zurück.
	 * @param array JSON-Array mit Benutzern
	 * @return JSONArray mit oberem Quartil des Parameter-Arrays
	 */
	private JSONArray getUpperQuartile(JSONArray array) throws JSONException
	{
		int n = array.length();
		int q3 = (int) (0.75 * (n+1));
		
		if (n == 3) {
			return array;
		}
		
		JSONArray q3array = new JSONArray();
		for (int i = q3 - 1; i < n; i++) {
			q3array.put(array.getJSONObject(i));
		}
			
		// Arrays kleiner 6 werden aufgefüllt
		if(q3array.length() < 6) {
			int j = q3-1;
			while(q3array.length() != 3 ){
				q3array.put(array.getJSONObject(--j));
			}
			return q3array;
			//Von größeren Arrays wird ein weiteres Oberes Quartil angefordert
		} else if (q3array.length() > 18) {	
			return getUpperQuartile(q3array);
		} else {
			return q3array;
		}
	}
}
