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

        $scores = HangmanScores::groupBy('user_id')
            ->select(DB::raw('sum(points) as points, sum(duration) as duration, users.name, sum(length(word)) as letters_guessed'))
            ->join('users', function($q){
                $q->on('hangman_scores.user_id', '=' ,'users.id');
            })
            ->orderBy('points', 'desc')
            ->paginate(5);

        return response()->json([
            'data' => [
                'scores' => $scores->toArray(),
            ]
        ]);
    }
}
