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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->enum('category', ['Work', 'Project', 'Personal']);
            $table->string('description', 200);
            $table->enum('status', ['Pending', 'Inprogress', 'Completed', 'Overdue'])->default('Pending');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->enum('priority', ['Low', 'Medium', 'High'])->default('Medium');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
