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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->text('description');
            $table->longText('long_description')->nullable();
            $table->string('image')->nullable();
            $table->date('date');
            $table->string('location')->nullable();
            $table->integer('participants')->default(0);
            $table->string('impact_label')->nullable();
            $table->string('impact_value')->nullable();
            $table->enum('status', ['completed', 'ongoing', 'upcoming'])->default('upcoming');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
