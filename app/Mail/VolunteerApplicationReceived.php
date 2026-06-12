<?php

namespace App\Mail;

use App\Models\Volunteer;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VolunteerApplicationReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Volunteer $volunteer) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouvelle candidature bénévole — ' . $this->volunteer->first_name . ' ' . $this->volunteer->last_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.volunteer-application',
        );
    }
}
