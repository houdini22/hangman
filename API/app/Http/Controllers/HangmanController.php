<?php

namespace App\Http\Controllers;

use App\Models\HangmanScores;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class HangmanController extends Controller
{
    public function postEndGame(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $validatedData = $request->validate([
            'points' => 'integer',
            'word' => 'max:64',
            'duration' => 'integer'
        ]);

        $score = new HangmanScores($validatedData);
        $score->user_id = $user->id;
        $score->save();

        return response()->json([
            'message' => 'Saved.'
        ]);
    }

    public function getScores(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $where = '1 = 1';
        if ($filters['date'] === "previous_year") {
            $year = ((int) date('Y')) - 1;
            $where = "year(hangman_scores.created_at) = '$year'";
        } else if ($filters['date'] === "this_month") {
            $month = date('m');
            $where = "month(hangman_scores.created_at) = '$month'";
        } else if ($filters['date'] === "this_year") {
            $year = date('Y');
            $where = "year(hangman_scores.created_at) = '$year'";
        }

        $scores = HangmanScores::groupBy('user_id')
            ->select(DB::raw('sum(points) as points, sum(duration) as duration, users.name as name, sum(length(word)) as letters_guessed, count(hangman_scores.id) as games_played'))
            ->join('users', function($q){
                $q->on('hangman_scores.user_id', '=' ,'users.id');
            })
            ->whereRaw(DB::raw($where))
            ->orderBy($request->get('sort_by'), $request->get('sort_direction'))
            ->paginate(5);

        return response()->json([
            'data' => [
                'scores' => $scores->toArray(),
            ]
        ]);
    }

    public function getMyStatistics(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $scores = HangmanScores::groupBy('user_id')
            ->select(DB::raw('sum(points) as points, sum(duration) as duration, sum(length(word)) as letters_guessed, max(points) as max_points, max(duration) as max_duration, max(length(word)) as max_length, count(hangman_scores.id) as games_played'))
            ->join('users', function($q){
                $q->on('hangman_scores.user_id', '=' ,'users.id');
            })
            ->where('users.id', '=', $user->id)
            ->first();

        return response()->json([
            'data' => [
                'statistics' => $scores->toArray(),
            ]
        ]);
    }
}
