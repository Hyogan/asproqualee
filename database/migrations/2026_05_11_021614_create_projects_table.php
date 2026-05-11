<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->enum('status', ['en-cours', 'terminé', 'planifié'])->default('planifié');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('location')->nullable();
            $table->unsignedTinyInteger('progress')->default(0);
            $table->string('impact_goal')->nullable();
            $table->string('impact_value')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
