<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <style>
        body { font-family: Arial, sans-serif; color: #0b2a3d; background: #f8fbfe; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #d0e8f5; }
        .header { background: #7dc044; padding: 24px 32px; }
        .header h1 { color: #ffffff; font-size: 20px; margin: 0; }
        .header p { color: #e8f5d0; font-size: 13px; margin: 4px 0 0; }
        .body { padding: 32px; }
        .field { margin-bottom: 20px; }
        .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #4a6a7d; margin-bottom: 4px; }
        .field p { margin: 0; font-size: 15px; color: #0b2a3d; }
        .tag { display: inline-block; background: #eef5fb; border: 1px solid #d0e8f5; border-radius: 999px; padding: 3px 10px; font-size: 13px; color: #055288; margin: 2px; }
        .motivation-box { background: #eef5fb; border-left: 4px solid #7dc044; border-radius: 6px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
        .footer { background: #eef5fb; padding: 16px 32px; text-align: center; font-size: 12px; color: #4a6a7d; }
        .btn { display: inline-block; margin-top: 24px; background: #7dc044; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>Nouvelle candidature bénévole</h1>
        <p>AsproQualee — Plateforme de gestion</p>
    </div>
    <div class="body">
        <div class="field">
            <label>Nom complet</label>
            <p>{{ $volunteer->first_name }} {{ $volunteer->last_name }}</p>
        </div>
        <div class="field">
            <label>Email</label>
            <p><a href="mailto:{{ $volunteer->email }}" style="color:#03b6ed;">{{ $volunteer->email }}</a></p>
        </div>
        @if($volunteer->phone)
        <div class="field">
            <label>Téléphone</label>
            <p>{{ $volunteer->phone }}</p>
        </div>
        @endif
        @if($volunteer->location)
        <div class="field">
            <label>Localisation</label>
            <p>{{ $volunteer->location }}</p>
        </div>
        @endif
        @if($volunteer->commitment)
        <div class="field">
            <label>Engagement</label>
            <p>{{ $volunteer->commitment }}</p>
        </div>
        @endif
        @if($volunteer->availability)
        <div class="field">
            <label>Disponibilité</label>
            <p>{{ $volunteer->availability }}</p>
        </div>
        @endif
        @if(!empty($volunteer->skills))
        <div class="field">
            <label>Compétences</label>
            <p>
                @foreach($volunteer->skills as $skill)
                    <span class="tag">{{ $skill }}</span>
                @endforeach
            </p>
        </div>
        @endif
        @if($volunteer->motivation)
        <div class="field">
            <label>Motivation</label>
            <div class="motivation-box">{{ $volunteer->motivation }}</div>
        </div>
        @endif
        <a href="{{ config('app.url') }}/admin/volunteers" class="btn">Voir dans l'admin</a>
    </div>
    <div class="footer">
        Cette candidature a été soumise depuis le formulaire bénévole du site AsproQualee.
    </div>
</div>
</body>
</html>
