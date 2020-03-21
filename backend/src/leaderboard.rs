use crate::account::UserId;
use crate::MainDbCon;
use rocket_contrib::json::Json;

#[derive(Serialize)]
pub struct LeaderboardResponse {
	id: i32,
	score: i32,
}

#[get("/")]
pub fn get_leaderboard(
	_user_id: UserId,
	con: MainDbCon,
) -> Result<Json<Vec<LeaderboardResponse>>, Box<dyn std::error::Error>> {
	let lb = con.0.query(
		"SELECT id, score FROM person ORDER BY score DESC LIMIT 10",
		&[],
	)?;
	let mut vec = Vec::new();
	for i in lb.iter() {
		let leader = LeaderboardResponse {
			id: i.get(0),
			score: i.get(1),
		};
		vec.push(leader);
	}
	Ok(Json(vec))
}
