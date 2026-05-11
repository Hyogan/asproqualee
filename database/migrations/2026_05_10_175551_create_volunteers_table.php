<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('volunteers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email');
            $table->string('phone', 30)->nullable();
            $table->string('location')->nullable();
            $table->json('skills')->nullable();
            $table->string('commitment', 50)->nullable();
            $table->text('availability')->nullable();
            $table->text('motivation')->nullable();
            $table->text('experience')->nullable();
            $table->enum('status', ['pending', 'contacted', 'active', 'inactive'])->default('pending');
            $table->timestamps();

            $table->index('email');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('volunteers');
    }
};
