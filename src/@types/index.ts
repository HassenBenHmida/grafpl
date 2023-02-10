export type Entry = {
  id: number;
  started_event: number;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  name: string;
};

export type EventHistory = {
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfer_cost: number;
  points_on_bench: number;
};

export type Player = {
  id: number;
  web_name: string;
  element_type: number;
  event_points: number;
  total_points: number;
};

export type Pick = {
  position: number;
  is_captain: boolean;
  player: Player;
};

export type Picks = {
  active_chip: string;
  automatic_subs: [];
  entry_history: EventHistory;
  picks: Pick[];
};
