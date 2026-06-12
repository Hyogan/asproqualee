<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <style>
        body { font-family: Arial, sans-serif; color: #0b2a3d; background: #f8fbfe; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #d0e8f5; }
        .header { background: #055288; padding: 24px 32px; }
        .header h1 { color: #ffffff; font-size: 20px; margin: 0; }
        .header p { color: #c0edff; font-size: 13px; margin: 4px 0 0; }
        .body { padding: 32px; }
        .field { margin-bottom: 20px; }
        .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #4a6a7d; margin-bottom: 4px; }
        .field p { margin: 0; font-size: 15px; color: #0b2a3d; }
        .message-box { background: #eef5fb; border-left: 4px solid #03b6ed; border-radius: 6px; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
        .footer { background: #eef5fb; padding: 16px 32px; text-align: center; font-size: 12px; color: #4a6a7d; }
        .btn { display: inline-block; margin-top: 24px; background: #03b6ed; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>Nouveau message de contact</h1>
        <p>AsproQualee — Plateforme de gestion</p>
    </div>
    <div class="body">
        <div class="field">
            <label>Nom</label>
            <p>{{ $message->name }}</p>
        </div>
        <div class="field">
            <label>Email</label>
            <p><a href="mailto:{{ $message->email }}" style="color:#03b6ed;">{{ $message->email }}</a></p>
        </div>
        @if($message->phone)
        <div class="field">
            <label>Téléphone</label>
            <p>{{ $message->phone }}</p>
        </div>
        @endif
        @if($message->subject)
        <div class="field">
            <label>Sujet</label>
            <p>{{ $message->subject }}</p>
        </div>
        @endif
        <div class="field">
            <label>Message</label>
            <div class="message-box">{{ $message->message }}</div>
        </div>
        <a href="{{ config('app.url') }}/admin/messages" class="btn">Voir dans l'admin</a>
    </div>
    <div class="footer">
        Ce message a été envoyé depuis le formulaire de contact du site AsproQualee.
    </div>
</div>
</body>
</html>
