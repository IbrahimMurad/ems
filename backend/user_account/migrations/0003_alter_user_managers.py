# Generated by Django 5.1.6 on 2025-02-23 05:18

import user_account.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("user_account", "0002_alter_user_email_alter_user_username"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[
                ("objects", user_account.models.UserManager()),
            ],
        ),
    ]
