from django.contrib import admin
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team_id', 'created_at')
    search_fields = ('name', 'email')
    list_filter = ('team_id', 'created_at')
    ordering = ('-created_at',)


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'activity_type', 'duration', 'distance', 'calories', 'date')
    search_fields = ('user_id', 'activity_type')
    list_filter = ('activity_type', 'date')
    ordering = ('-date',)


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'team_id', 'rank', 'total_points', 'updated_at')
    search_fields = ('user_id', 'team_id')
    list_filter = ('team_id', 'rank')
    ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty', 'duration', 'category')
    search_fields = ('name', 'description', 'category')
    list_filter = ('difficulty', 'category')
    ordering = ('name',)
