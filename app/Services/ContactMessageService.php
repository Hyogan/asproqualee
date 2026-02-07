<?php

namespace App\Services;

use App\Models\ContactMessage;

class ContactMessageService
{
    public function all()
    {
        return ContactMessage::latest()->paginate(20);
    }

    public function find(int $id): ContactMessage
    {
        return ContactMessage::findOrFail($id);
    }

    public function create(array $data): ContactMessage
    {
        return ContactMessage::create($data);
    }

    public function update(ContactMessage $message, array $data): ContactMessage
    {
        $message->update($data);
        return $message->fresh();
    }

    public function delete(ContactMessage $message): void
    {
        $message->delete();
    }
}
