export const types = `#graphql
type Query {
  team(id: ID!): Team!
  fixture(id: ID!): Fixture!
  event(id: ID!): Event!
  events(finished: Boolean): [Event!]!
  players(limit: Int, filter: String): [Player!]!
  player(id: ID, name: String): Player!
  entry(id: ID!): Entry!
  entryHistory(id: ID!): EntryHistory
  live(event: Int!, id: ID!): Live!
  picks(entry: Int!, event: Int!): Picks!
  playerSummary(id: ID!): PlayerSummary
}

type Event {
  id: ID!
  name: String!
  deadline_time: String!
  average_entry_score: Int!
  finished: Boolean!
  data_checked: Boolean!
  highest_scoring_entry: Int
  deadline_time_epoch: Int!
  deadline_time_game_offset: Int!
  highest_score: Int
  is_previous: Boolean!
  is_current: Boolean!
  is_next: Boolean!
  chip_plays: [ChipPlay!]!
  most_selected: Player
  most_transferred_in: Player
  top_element: Player
  top_element_info: TopElementInfo
  transfers_made: Int!
  most_captained: Player
  most_vice_captained: Player
  fixtures: [Fixture!]!
}

type ChipPlay {
  chip_name: String!
  num_played: Int!
}

type Team {
  code: String!
  form: Boolean
  id: ID!
  name: String!
  short_name: String!
  strength: Int!
  strength_overall_home: Int!
  strength_overall_away: Int!
  strength_attack_home: Int!
  strength_attack_away: Int!
  strength_defence_home: Int!
  strength_defence_away: Int!
  players: [Player!]!
  fixtures: [Fixture!]!
}

type Fixture {
  code: Int!
  event: Int!
  finished: Boolean!
  finished_provisional: Boolean!
  id: ID!
  kickoff_time: String!
  minutes: Int!
  provisional_start_time: Boolean!
  started: Boolean!
  team_a: Team!
  team_h: Team!
  team_a_score: Int
  team_h_score: Int
  stats: [FixtureStats]
}

type FixtureStats {
  identifier: String
  a: [FixtureStat]
  h: [FixtureStat]
}

type FixtureStat {
  value: Int
  player: Player
}

type Players {
  list: [Player]
}

type Player {
  chance_of_playing_next_round: Int
  chance_of_playing_this_round: Int
  code: Int!
  cost_change_event: Int!
  cost_change_event_fall: Int!
  cost_change_start: Int!
  cost_change_start_fall: Int!
  dreamteam_count: Int!
  element_type: Int!
  ep_next: String!
  ep_this: String!
  event_points: Int!
  first_name: String!
  form: String!
  id: ID!
  in_dreamteam: Boolean!
  news: String
  news_added: String
  now_cost: Int!
  photo: String!
  points_per_game: String!
  second_name: String!
  selected_by_percent: Float!
  special: Boolean!
  status: String
  team: Team!
  total_points: Int!
  transfers_in: Int!
  transfers_in_event: Int!
  transfers_out: Int!
  transfers_out_event: Int!
  value_form: Int!
  value_season: Int!
  web_name: String!
  minutes: Int!
  goals_scored: Int!
  assists: Int!
  clean_sheets: Int!
  goals_conceded: Int!
  own_goals: Int!
  penalties_saved: Int!
  penalties_missed: Int!
  yellow_cards: Int!
  red_cards: Int!
  saves: Int!
  bonus: Int!
  bps: Int!
  influence: String!
  creativity: String!
  threat: String!
  ict_index: String!
}

type TopElementInfo {
  id: ID!
  points: Int!
}

type Entry {
  id: ID!
  joined_time: String!
  started_event: Int!
  player_first_name: String!
  player_last_name: String!
  player_region_id: Int!
  player_region_name: String!
  summary_overall_points: Int
  summary_overall_rank: Int!
  summary_event_points: Int!
  summary_event_rank: Int!
  current_event: Int!
  name: String!
  last_deadline_bank: Int
  last_deadline_value: Int!
  last_deadline_total_transfers: Int
}

type EntryHistory {
  current: [EventHistory]
}

type EventHistory {
  event: Event!
  points: Int!
  total_points: Int!
  rank: Int!
  rank_sort: Int!
  overall_rank: Int!
  bank: Int!
  value: Int!
  event_transfers: Int!
  event_transfer_cost: Int!
  points_on_bench: Int!
}

type Picks {
  active_chip: String
  automatic_subs: [Player]
  entry_history: EventHistory
  picks: [Pick]
}

type Pick {
  player: Player
  position: Int
  multiplier: Int
  is_captain: Boolean
  is_vice_captain: Boolean
}

type Live {
  player: Player!
  stats: LiveStats!
  explain: Explain!
}

type LiveStats {
  minutes: Int!
  goals_scored: Int!
  assists: Int!
  clean_sheets: Int!
  goals_conceded: Int!
  own_goals: Int!
  penalties_saved: Int!
  penalties_missed: Int!
  yellow_cards: Int!
  red_cards: Int!
  saves: Int!
  bonus: Int!
  bps: Int!
  influence: Float!
  creativity: Float!
  threat: Float!
  ict_index: Float!
  total_points: Int!
  in_dreamteam: Boolean!
}

type Explain {
  fixture: Fixture!
  stats: [LiveStat]
}

type LiveStat {
  identifier: String!
  points: Int!
  value: Int!
}

type PlayerSummary {
  fixtures: [UpcomingFixture]
  history: [PastFixture]
  history_past: [PastSeason]
}

type UpcomingFixture {
  code: Int
  team_h: Int
  team_h_name: String
  team_a: Int
  team_a_name: String
  event: Int
  finished: Boolean
  minutes: Int
  provisional_start_time: Boolean
  kickoff_time: String
  event_name: String
  is_home: Boolean
  difficulty: Int
}

type PastFixture {
  opponent_team: String
  total_points: Int!
  was_home: Boolean!
  kickoff_time: String!
  team_h_score: Int!
  team_a_score: Int!
  round: Int!
  minutes: Int!
  goals_scored: Int!
  assists: Int!
  clean_sheets: Int!
  goals_conceded: Int!
  own_goals: Int!
  penalties_saved: Int!
  penalties_missed: Int!
  yellow_cards: Int!
  red_cards: Int!
  saves: Int!
  bonus: Int!
  bps: Int!
  influence: String!
  creativity: String!
  threat: String!
  ict_index: String!
  value: Int!
  transfers_balance: Int!
  selected: Int!
  transfers_in: Int!
  transfers_out: Int!
}

type PastSeason {
  season_name: String!
  element_code: Int!
  start_cost: Int!
  end_cost: Int!
  total_points: Int!
  minutes: Int!
  goals_scored: Int!
  assists: Int!
  clean_sheets: Int!
  goals_conceded: Int!
  own_goals: Int!
  penalties_saved: Int!
  penalties_missed: Int!
  yellow_cards: Int!
  red_cards: Int!
  saves: Int!
  bonus: Int!
  bps: Int!
  influence: String!
  creativity: String!
  threat: String!
  ict_index: String!
}
`;
