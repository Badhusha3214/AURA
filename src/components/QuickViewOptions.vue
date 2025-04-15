<template>
  <div class="quick-view-options bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 class="text-lg font-semibold text-pink-500 mb-3">Quick Actions</h3>
    
    <!-- Starting Date Option -->
    <div class="option-group mb-3">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Add Period Start Date</h4>
      <div class="flex">
        <input 
          type="date" 
          v-model="startDate"
          class="w-full p-2 border border-gray-300 rounded-md mr-2"
          :max="today"
        />
        <button 
          @click="saveStartDate" 
          class="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          :disabled="loading.startDate"
        >
          <span v-if="loading.startDate">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
    
    <!-- Ending Date Option -->
    <div class="option-group mb-3">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Add Period End Date</h4>
      <div class="flex">
        <input 
          type="date" 
          v-model="endDate"
          class="w-full p-2 border border-gray-300 rounded-md mr-2"
          :max="today"
        />
        <button 
          @click="saveEndDate" 
          class="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          :disabled="loading.endDate"
        >
          <span v-if="loading.endDate">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
    
    <!-- Mood Option -->
    <div class="option-group mb-3">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Your Mood</h4>
      <div class="flex">
        <select 
          v-model="mood" 
          class="w-full p-2 border border-gray-300 rounded-md mr-2"
        >
          <option value="">Select your mood</option>
          <option value="Happy">Happy</option>
          <option value="Calm">Calm</option>
          <option value="Anxious">Anxious</option>
          <option value="Irritable">Irritable</option>
          <option value="Sad">Sad</option>
          <option value="Energetic">Energetic</option>
          <option value="Tired">Tired</option>
        </select>
        <button 
          @click="saveMood" 
          class="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          :disabled="loading.mood || !mood"
        >
          <span v-if="loading.mood">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
    
    <!-- Bleeding Status Option -->
    <div class="option-group">
      <h4 class="text-sm font-medium text-gray-700 mb-1">Bleeding Status</h4>
      <div class="flex">
        <select 
          v-model="bleedingStatus" 
          class="w-full p-2 border border-gray-300 rounded-md mr-2"
        >
          <option value="">Select bleeding level</option>
          <option value="None">None</option>
          <option value="Light">Light</option>
          <option value="Medium">Medium</option>
          <option value="Heavy">Heavy</option>
          <option value="Spotting">Spotting</option>
        </select>
        <button 
          @click="saveBleedingStatus" 
          class="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
          :disabled="loading.bleedingStatus || !bleedingStatus"
        >
          <span v-if="loading.bleedingStatus">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>

    <!-- Status Message -->
    <div v-if="statusMessage" class="mt-3">
      <div :class="['p-2 rounded', statusSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { addPeriodStartDate, addPeriodEndDate, addMoodData, addBleedingStatus } from '@/api/index.js';
import moment from 'moment';

export default {
  name: 'QuickViewOptions',
  data() {
    return {
      startDate: '',
      endDate: '',
      mood: '',
      bleedingStatus: '',
      loading: {
        startDate: false,
        endDate: false,
        mood: false,
        bleedingStatus: false
      },
      statusMessage: '',
      statusSuccess: true,
      today: moment().format('YYYY-MM-DD')
    };
  },
  methods: {
    async saveStartDate() {
      if (!this.startDate) {
        this.showStatus('Please select a start date', false);
        return;
      }
      
      this.loading.startDate = true;
      try {
        const response = await addPeriodStartDate({
          start_date: this.startDate
        });
        
        if (response && response.data && response.data.message) {
          this.showStatus(response.data.message, true);
          this.startDate = '';
          this.$emit('period-data-updated');
        } else {
          this.showStatus('Failed to save start date', false);
        }
      } catch (error) {
        this.showStatus('Error: ' + (error.message || 'Failed to save'), false);
      } finally {
        this.loading.startDate = false;
      }
    },
    
    async saveEndDate() {
      if (!this.endDate) {
        this.showStatus('Please select an end date', false);
        return;
      }
      
      this.loading.endDate = true;
      try {
        const response = await addPeriodEndDate({
          end_date: this.endDate
        });
        
        if (response && response.data && response.data.message) {
          this.showStatus(response.data.message, true);
          this.endDate = '';
          this.$emit('period-data-updated');
        } else {
          this.showStatus('Failed to save end date', false);
        }
      } catch (error) {
        this.showStatus('Error: ' + (error.message || 'Failed to save'), false);
      } finally {
        this.loading.endDate = false;
      }
    },
    
    async saveMood() {
      if (!this.mood) {
        this.showStatus('Please select your mood', false);
        return;
      }
      
      this.loading.mood = true;
      try {
        const response = await addMoodData({
          mood: this.mood
        });
        
        if (response && response.data && response.data.message) {
          this.showStatus('Mood saved successfully', true);
          this.mood = '';
          this.$emit('mood-data-updated');
        } else {
          this.showStatus('Failed to save mood', false);
        }
      } catch (error) {
        this.showStatus('Error: ' + (error.message || 'Failed to save'), false);
      } finally {
        this.loading.mood = false;
      }
    },
    
    async saveBleedingStatus() {
      if (!this.bleedingStatus) {
        this.showStatus('Please select bleeding status', false);
        return;
      }
      
      this.loading.bleedingStatus = true;
      try {
        const response = await addBleedingStatus({
          status: this.bleedingStatus
        });
        
        if (response && response.data && response.data.message) {
          this.showStatus('Bleeding status saved successfully', true);
          this.bleedingStatus = '';
          this.$emit('bleeding-data-updated');
        } else {
          this.showStatus('Failed to save bleeding status', false);
        }
      } catch (error) {
        this.showStatus('Error: ' + (error.message || 'Failed to save'), false);
      } finally {
        this.loading.bleedingStatus = false;
      }
    },
    
    showStatus(message, success) {
      this.statusMessage = message;
      this.statusSuccess = success;
      
      // Clear the status message after 3 seconds
      setTimeout(() => {
        this.statusMessage = '';
      }, 3000);
    }
  }
};
</script>
