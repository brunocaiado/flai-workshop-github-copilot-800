from django.test import TestCase
from django.utils import timezone
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team for unit testing'
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(str(self.team), 'Test Team')


class UserModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='testpass123',
            team_id=str(self.team.id)
        )

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(str(self.user), 'Test User')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id='1',
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=timezone.now()
        )

    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.distance, 5.0)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id='1',
            team_id='1',
            total_points=1000,
            rank=1
        )

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.total_points, 1000)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout routine',
            difficulty='Medium',
            duration=45,
            category='Strength',
            exercises=[
                {'name': 'Push-ups', 'reps': 20, 'sets': 3}
            ]
        )

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'Medium')
        self.assertEqual(str(self.workout), 'Test Workout')
