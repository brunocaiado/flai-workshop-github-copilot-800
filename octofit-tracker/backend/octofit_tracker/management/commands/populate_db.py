from django.core.management.base import BaseCommand
from django.utils import timezone
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes unite for fitness!'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League training program for peak performance!'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create Users (Superheroes)
        self.stdout.write('Creating superhero users...')
        
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team': team_marvel},
            {'name': 'Steve Rogers', 'email': 'captainamerica@marvel.com', 'team': team_marvel},
            {'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'team': team_marvel},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'team': team_marvel},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'team': team_marvel},
            {'name': 'Peter Parker', 'email': 'spiderman@marvel.com', 'team': team_marvel},
        ]
        
        dc_heroes = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'team': team_dc},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team': team_dc},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'team': team_dc},
            {'name': 'Barry Allen', 'email': 'flash@dc.com', 'team': team_dc},
            {'name': 'Arthur Curry', 'email': 'aquaman@dc.com', 'team': team_dc},
            {'name': 'Hal Jordan', 'email': 'greenlantern@dc.com', 'team': team_dc},
        ]
        
        users = []
        for hero_data in marvel_heroes + dc_heroes:
            user = User.objects.create(
                name=hero_data['name'],
                email=hero_data['email'],
                password='superhero123',  # In production, use proper password hashing
                team_id=str(hero_data['team'].id)
            )
            users.append(user)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} superhero users!'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'CrossFit']
        activities_created = 0
        
        for user in users:
            # Create 5-10 random activities for each user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)  # 20-120 minutes
                distance = random.uniform(2, 15) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                calories = duration * random.randint(5, 12)  # Rough calorie calculation
                
                Activity.objects.create(
                    user_id=str(user.id),
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=timezone.now() - timedelta(days=random.randint(0, 30)),
                    notes=f'{user.name} training session'
                )
                activities_created += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities!'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        
        leaderboard_entries = []
        for user in users:
            # Calculate total points based on user's activities
            user_activities = Activity.objects.filter(user_id=str(user.id))
            total_points = sum(activity.calories for activity in user_activities)
            
            leaderboard_entry = Leaderboard.objects.create(
                user_id=str(user.id),
                team_id=user.team_id,
                total_points=total_points,
                rank=0  # Will be calculated after all entries are created
            )
            leaderboard_entries.append((leaderboard_entry, total_points))
        
        # Sort and assign ranks
        leaderboard_entries.sort(key=lambda x: x[1], reverse=True)
        for rank, (entry, _) in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
            entry.save()
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries!'))
        
        # Create Workouts
        self.stdout.write('Creating workout programs...')
        
        workouts = [
            {
                'name': 'Iron Man Cardio Blast',
                'description': 'High-intensity cardio workout to power up like Tony Stark',
                'difficulty': 'Hard',
                'duration': 45,
                'category': 'Cardio',
                'exercises': [
                    {'name': 'Burpees', 'reps': 20, 'sets': 3},
                    {'name': 'Mountain Climbers', 'reps': 30, 'sets': 3},
                    {'name': 'Jump Squats', 'reps': 15, 'sets': 3},
                ]
            },
            {
                'name': 'Captain America Strength Training',
                'description': 'Build super-soldier strength with this power workout',
                'difficulty': 'Medium',
                'duration': 60,
                'category': 'Strength',
                'exercises': [
                    {'name': 'Bench Press', 'reps': 12, 'sets': 4},
                    {'name': 'Squats', 'reps': 15, 'sets': 4},
                    {'name': 'Deadlifts', 'reps': 10, 'sets': 4},
                ]
            },
            {
                'name': 'Thor Thunder Hammer Workout',
                'description': 'Mighty Asgardian training for godlike power',
                'difficulty': 'Hard',
                'duration': 50,
                'category': 'Strength',
                'exercises': [
                    {'name': 'Hammer Curls', 'reps': 15, 'sets': 3},
                    {'name': 'Overhead Press', 'reps': 12, 'sets': 4},
                    {'name': 'Battle Ropes', 'duration': '30 seconds', 'sets': 3},
                ]
            },
            {
                'name': 'Black Widow Agility Training',
                'description': 'Develop spy-level agility and flexibility',
                'difficulty': 'Medium',
                'duration': 40,
                'category': 'Flexibility',
                'exercises': [
                    {'name': 'Yoga Flow', 'duration': '15 minutes', 'sets': 1},
                    {'name': 'Leg Stretches', 'duration': '10 minutes', 'sets': 1},
                    {'name': 'Core Balance', 'duration': '15 minutes', 'sets': 1},
                ]
            },
            {
                'name': 'Superman Power Flight',
                'description': 'Kryptonian-inspired full-body workout',
                'difficulty': 'Hard',
                'duration': 55,
                'category': 'Full Body',
                'exercises': [
                    {'name': 'Superman Holds', 'duration': '45 seconds', 'sets': 3},
                    {'name': 'Plank to Push-up', 'reps': 20, 'sets': 3},
                    {'name': 'Box Jumps', 'reps': 15, 'sets': 3},
                ]
            },
            {
                'name': 'Batman Dark Knight Routine',
                'description': 'Train like the World\'s Greatest Detective',
                'difficulty': 'Hard',
                'duration': 60,
                'category': 'Mixed Martial Arts',
                'exercises': [
                    {'name': 'Shadow Boxing', 'duration': '5 minutes', 'sets': 3},
                    {'name': 'Bag Work', 'duration': '5 minutes', 'sets': 3},
                    {'name': 'Grappling Drills', 'duration': '10 minutes', 'sets': 2},
                ]
            },
            {
                'name': 'Wonder Woman Warrior Training',
                'description': 'Amazonian warrior conditioning program',
                'difficulty': 'Medium',
                'duration': 45,
                'category': 'Combat',
                'exercises': [
                    {'name': 'Sword Swings', 'reps': 25, 'sets': 3},
                    {'name': 'Shield Raises', 'reps': 20, 'sets': 3},
                    {'name': 'Warrior Lunges', 'reps': 15, 'sets': 3},
                ]
            },
            {
                'name': 'Flash Speed Training',
                'description': 'Lightning-fast speed and agility drills',
                'difficulty': 'Easy',
                'duration': 30,
                'category': 'Speed',
                'exercises': [
                    {'name': 'Sprint Intervals', 'duration': '30 seconds', 'sets': 5},
                    {'name': 'Ladder Drills', 'duration': '2 minutes', 'sets': 3},
                    {'name': 'Shuttle Runs', 'reps': 10, 'sets': 3},
                ]
            },
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workout programs!'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS('Database population complete!'))
        self.stdout.write(self.style.SUCCESS('='*50))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
        self.stdout.write(self.style.SUCCESS('='*50 + '\n'))
